// TokenDeductionContract.cdc
// Contract for handling token deductions for AI search services

access(all) contract TokenDeductionContract {
    
    access(all) resource TokenVault {
        access(all) var balance: UFix64
        
        init(balance: UFix64) {
            self.balance = balance
        }
        
        // Withdraw tokens from vault
        access(all) fun withdraw(amount: UFix64): @TokenVault {
            pre {
                self.balance >= amount: "Insufficient balance"
            }
            self.balance = self.balance - amount
            return <- create TokenVault(balance: amount)
        }
        
        // Deposit tokens into vault
        access(all) fun deposit(from: @TokenVault) {
            self.balance = self.balance + from.balance
            destroy from
        }
    }
    
    access(all) struct UserAccount {
        access(all) let vault: @TokenVault?
        access(all) var totalSearches: UInt64
        access(all) var totalTokensUsed: UFix64
        
        init(vault: @TokenVault?) {
            self.vault <- vault
            self.totalSearches = 0
            self.totalTokensUsed = 0.0
        }
    }
    
    // Service configuration
    access(all) let tokenRatePerWord: UFix64  // Tokens per word rate
    access(all) let baseTokenCut: UFix64      // Base token cut
    access(all) let additionalTokenRate: UFix64 // Additional tokens per 1000 words
    
    // Storage for user accounts
    access(all) let userAccounts: {Address: UserAccount}
    
    // Events
    access(all) event TokensDeducted(user: Address, amount: UFix64, searchId: String)
    access(all) event AccountCreated(user: Address)
    access(all) event TokensAdded(user: Address, amount: UFix64)
    access(all) event SearchProcessed(user: Address, wordCount: UInt64, tokensUsed: UFix64)
    
    access(all) fun cleanupVault(vault: @TokenVault?) {
        if let vault <- vault {
            destroy vault
        }
    }
    
    init() {
        self.tokenRatePerWord = 0.05  // 0.05 tokens per word
        self.baseTokenCut = 50.0     // Base 50 token cut
        self.additionalTokenRate = 50.0 // Additional 50 tokens per 1000 words
        self.userAccounts = {}
    }
    
    // Calculate tokens required for a search based on word count
    access(all) fun calculateTokensRequired(wordCount: UInt64): UFix64 {
        let baseTokens = self.baseTokenCut
        
        if wordCount <= 1000 {
            return baseTokens
        }
        
        // Calculate additional tokens for words beyond 1000
        let additionalThousands = (wordCount - 1) / 1000  // Integer division
        let additionalTokens = self.additionalTokenRate * UFix64(additionalThousands)
        
        return baseTokens + additionalTokens
    }
    
    // Create a new user account
    access(all) fun createAccount() {
        let caller = getAuthAccount()
        let callerAddress = caller.address
        
        // Check if account already exists
        if self.userAccounts[callerAddress] != nil {
            panic("Account already exists")
        }
        
        // Create empty vault for new user
        let newVault <- create TokenVault(balance: 0.0)
        let userAccount = UserAccount(vault: <- newVault)
        
        self.userAccounts[callerAddress] = userAccount
        
        emit AccountCreated(user: callerAddress)
    }
    
    // Add tokens to user account
    access(all) fun addTokens(amount: UFix64) {
        pre {
            amount > 0.0: "Amount must be positive"
        }
        
        let callerAddress = getAuthAccount().address
        
        // Get or create user account
        if self.userAccounts[callerAddress] == nil {
            self.createAccount()
        }
        
        let userAccount = self.userAccounts[callerAddress]!
        
        // Create new tokens and add to user's vault
        let newTokens <- create TokenVault(balance: amount)
        
        if userAccount.vault == nil {
            userAccount.vault <- newTokens
        } else {
            userAccount.vault!.deposit(from: <- newTokens)
        }
        
        emit TokensAdded(user: callerAddress, amount: amount)
    }
    
    // Deduct tokens for AI search service
    access(all) fun deductTokensForSearch(wordCount: UInt64, searchId: String): Bool {
        pre {
            wordCount > 0: "Word count must be positive"
        }
        
        let callerAddress = getAuthAccount().address
        
        // Check if user account exists
        if self.userAccounts[callerAddress] == nil {
            panic("User account does not exist. Please create an account first.")
        }
        
        let userAccount = self.userAccounts[callerAddress]!
        
        // Calculate required tokens
        let requiredTokens = self.calculateTokensRequired(wordCount)
        
        // Check if user has sufficient balance
        if userAccount.vault == nil || userAccount.vault!.balance < requiredTokens {
            return false
        }
        
        // Deduct tokens
        let tokensToDeduct <- userAccount.vault!.withdraw(amount: requiredTokens)
        destroy tokensToDeduct
        
        // Update user statistics
        userAccount.totalSearches = userAccount.totalSearches + 1
        userAccount.totalTokensUsed = userAccount.totalTokensUsed + requiredTokens
        
        emit TokensDeducted(user: callerAddress, amount: requiredTokens, searchId: searchId)
        emit SearchProcessed(user: callerAddress, wordCount: wordCount, tokensUsed: requiredTokens)
        
        return true
    }
    
    // Get user account information
    access(all) fun getAccountInfo(address: Address): UserAccount? {
        return self.userAccounts[address]
    }
    
    // Get user token balance
    access(all) fun getTokenBalance(address: Address): UFix64 {
        if let userAccount = self.userAccounts[address] {
            if let vault = userAccount.vault {
                return vault.balance
            }
        }
        return 0.0
    }
    
    // Get token requirement for a specific word count
    access(all) fun getTokenRequirement(wordCount: UInt64): UFix64 {
        return self.calculateTokensRequired(wordCount)
    }
    
    // Admin function to update rates (only contract owner)
    access(all) fun updateRates(newBaseCut: UFix64, newAdditionalRate: UFix64) {
        // In production, add admin authentication here
        self.baseTokenCut = newBaseCut
        self.additionalTokenRate = newAdditionalRate
    }
}