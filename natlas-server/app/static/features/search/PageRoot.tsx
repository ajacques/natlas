import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../../store";
import SearchBox from "./SearchBox";
import "searchkit/theming/theme.scss";

import {
    DynamicRangeFilter,
    RefinementListFilter,
    SearchkitComponent,
    SearchkitProvider,
    Hits,
    SearchkitComponentProps,
    SearchkitManager,
    HitItemProps,
    Layout,
    LayoutBody,
    SideBar,
    LayoutResults,
    InputFilter
} from "searchkit";

interface Props extends SearchkitComponentProps {
}

type PortScript = {
    id: string
    output: string
};

type Port = {
    id: string
    banner: string
    port: string
    protocol: string
    scripts: PortScript[]
    service: any
};

type Scan = {
    ip: string
    ports: Port[]
};

const sk = new SearchkitManager("/es_search");

class HitItem extends React.PureComponent<HitItemProps> {
    renderHostLink() {
        return <a href={`/host/${this.props.result.ip}`}>{this.props.result.ip}</a>;
    }
    renderScanLink() {
        return (
            <a href={`/host/${this.props.result.ip}/${this.props.result.id}`}>
                <time></time>
            </a>
        );
    }
    renderPortScript = (portScript: PortScript) => {
        return (
            <div key={portScript.id} className="row script-data">
                <div className="col">
                    <h5 className="text-muted">{portScript.id}</h5>
                    <div className="script-output pl-2 pt-2">{portScript.output}</div>
                </div>
            </div>
        );
    }
    renderPort = (port: Port) => {
        return (
            <div key={port.id} className="row py-3">
                <div className="col-xs-6 col-sm-2">
                    <div>
                        <div className="port-number">{port.port}</div>
                        <div className="port-protocol">{port.protocol}</div>
                    </div>
                    <div className="port-service">{port.service.name}</div>
                </div>
                <div className="col-xs-12 col-sm-10 port-details">
                    <h5>{port.service.product}</h5>
                    {port.scripts.map(this.renderPortScript)}
                </div>
            </div>
        );
    }
    renderScanWithPorts(scan: Scan) {
        if (!scan.ports) {
            return undefined;
        }

        return (
            <div className="col-xs-12 col-sm-8 col-md-9">
                {scan.ports.map(this.renderPort)}
            </div>
        );
    }

    render() {
        const scan = this.props.result._source;
        return (
            <div className="row host-row py-1">
                <div className="col-xs-12 col-sm-4 col-md-3">
                    <h3 className="mt-2">
                        {this.renderHostLink()}
                    </h3>
                    <div className="date-submitted">
                        <span className="submitted-text text-muted pr-1">Submitted:</span>
                        {this.renderScanLink()}
                    </div>
                    <h5 className="mt-2">Open Ports</h5>
                    <span className="port-str">{scan.port_str}</span>
                    <h5 className="mt-2">Hostname</h5>
                    <span className="host-hostname">{scan.hostname}</span>
                </div>
                {this.renderScanWithPorts(scan)}
            </div>
        );
    }
}

class MyComponent extends SearchkitComponent<Props, never> {
    render() {
        return (
            <SearchkitProvider searchkit={sk}>
                <Layout>
                    <LayoutBody>
                        <SideBar>
                            <RefinementListFilter id="scan_reason" field="scan_reason" title="Scan Reason" />
                            <RefinementListFilter id="agent" field="agent" title="Agent" />
                            <RefinementListFilter id="is_up" field="is_up" title="Is Up" />
                            <RefinementListFilter id="port_str" field="port_str" title="Open Port" />
                            <InputFilter id="hostname" title="Hostname" placeholder="example.com" searchOnChange={true} prefixQueryFields={["hostname"]} queryFields={["hostname"]} />
                            <DynamicRangeFilter id="port_count" field="port_count" title="Number of Ports" />
                        </SideBar>
                        <LayoutResults>
                            <Hits hitsPerPage={50} mod="sk-hits-grid" itemComponent={HitItem} />
                        </LayoutResults>
                    </LayoutBody>
                </Layout>
            </SearchkitProvider>
        );
    }
}

const component = (
    <Provider store={store}>
        <MyComponent />
        <SearchBox />
    </Provider>
);

ReactDOM.render(component, document.getElementById("app"));
