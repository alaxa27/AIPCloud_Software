import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {
  Hero,
  HorizontalSplit,
  PricingPlan,
  PricingTable,
  Section,
  Team,
  TeamMember
} from "./neal";
import './neal/style.min.css'

import Header from '../Header'

const pricingPlan1 = {
  name: "Medium",
  description: "Access to AIPCloud as a REST API.",
  price: "$200",
  features: {
    "REST API": true,
    "Multiple accounts": true,
    "24/7 Customer Service": false,
    "Custom Software": false
  }
};

const pricingPlan2 = Object.assign({}, pricingPlan1, {
  price: "$499",
  name: "Startup",
  description: "Access to AIPCloud as a REST API. Access to AIPCloud softwares.",
  features: Object.assign({}, pricingPlan1.features, {"24/7 Customer Service": true})
});

const pricingPlan3 = Object.assign({}, pricingPlan2, {
  price: "Undefined",
  name: "Custom",
  description: "We build the software you need to work above the API.",
  features: Object.assign({}, pricingPlan2.features, {"Custom Software": true})
});

const sampleCode1 = `
#Using our python wrapper
from aipcloud.sound.emotion import SpeechEmotionAnalyzer

speechEmotionAnalyzer = SpeechEmotionAnalyer()
speechEmotionAnalyzer.load()
file = audio_file
speechEmotionAnalyzer.analyze(file)
`;

const sampleCode2 = `
#Using REST API Call
curl \\
  -u user@aipcloud.io:complicatedpassword \\
  -i -X POST \\
  -F file=@/path/to/file.mp3 \\
  http://api.aipcloud.io/analyze/sound/emotion`;

class LandingPage extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header >
        <div className="app-body">
          <main className="main">
            <div className="container-fluid">
              <div className="animated fadeIn">

                  <Hero backgroundImage="img/hero-bg-01.jpg" className="text-xs-center">
                    <h1 className="display-4">
                      Artificial Intelligence Powered Cloud
                    </h1>
                    <p className="lead">We provide you with state of the art Artificial Intelligence systems to help you grow your business.</p>
                    <p>
                      <a href="https://github.com/dennybritz/neal-react" target="_blank" className="btn btn-white">
                        Learn More
                      </a>
                    </p>
                  </Hero>

                  <Section className="nopad-bottom">
                    <Row>
                      <Col>
                        <pre><code>{sampleCode1}</code></pre>
                      </Col>
                      <Col>
                        <h1>OR</h1>
                      </Col>
                      <Col>
                        <pre><code>{sampleCode2}</code></pre>
                      </Col>
                    </Row>
                  </Section>

                  <Section>
                    <HorizontalSplit padding="md">
                      <div>
                        <p className="lead">Easy to use API</p>
                        <p>We provide you with an easy to use and well documented API. Accessible both from HTTP resquests and a Python Wrapper. NodeJS will be comming soon...</p>
                      </div>
                      <div>
                        <p className="lead">Third-Party Integrations</p>
                        <p>You can easily integrate one of numerous AIPCloud modules to your existing projects. Check out the doc to learn more about this.</p>
                      </div>
                      <div>
                        <p className="lead">Serverless Deployment</p>
                        <p>Because you are relying on Cloud technologies you will not need to worry about anyting complicated. All the hard work has been taken care of in the cloud. Seriously you can run huge amount of calculations from your watch.</p>
                      </div>
                    </HorizontalSplit>
                  </Section>

                  <Section>
                    <PricingTable>
                      <PricingPlan {... pricingPlan1}/>
                      <PricingPlan {... pricingPlan2}/>
                      <PricingPlan {... pricingPlan3}/>
                    </PricingTable>
                  </Section>

                  <Section>
                    <Team>
                      <TeamMember name="Maxime Jumelle" title="Resarcher" imageUrl="img/people/team_maxime.jpg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                      </TeamMember>
                      <TeamMember name="Taqiyeddine Sakmeche" title="Engineer" imageUrl="img/people/team_taqiyeddine.jpg">
                        I provide cutting edge infrastructure for our team to work on. I also develop the whole stack while assisting the research by implementing the latest research papers.
                      </TeamMember>
                      <TeamMember name="Benjamin Dallard" title="" imageUrl="img/people/team_benjamin.jpg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                      </TeamMember>
                      <TeamMember name="Pierre Rougeron" title="" imageUrl="img/people/team_pierre.jpg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                      </TeamMember>
                    </Team>
                  </Section>
              </div>
            </div>
          </main>
        </div>
      </div>

    );
  }
}

export default(LandingPage);
