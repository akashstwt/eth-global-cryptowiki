import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <section className="py-16 px-6" id="about">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            About CryptoWiki
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Open-source Web3 research platform built for hackathons
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="simple-card p-6">
            <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Flow Blockchain for subscriptions</li>
              <li>• Filecoin for decentralized storage</li>
              <li>• AI agents for research automation</li>
              <li>• The Graph for data indexing</li>
            </ul>
          </div>
          <div className="simple-card p-6">
            <h3 className="text-xl font-semibold mb-4">Open Source</h3>
            <p className="text-muted-foreground mb-4">
              CryptoWiki is built as an open-source project for the Web3 community. 
              Contribute on GitHub and help improve crypto research for everyone.
            </p>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;