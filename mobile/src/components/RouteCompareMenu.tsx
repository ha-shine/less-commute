import * as React from 'react';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import './RouteCompareMenu.css';
import DirectionsStepsRenderer from './DirectionsStepsRenderer';

interface Props {
    baseRoutes: DirectionsRoutePair | null;
    days: number;
    onClickAddRouteBtn: () => void;
    additionalRoutes: DirectionsRoutePair[];
    expandedRouteId: string;
    onExpandRoute: (routeId: string) => void;
    onCollapseRoute: () => void;
}
export function RouteCompareMenu(p: Props) {
    if (p.baseRoutes !== null) {
        const additionalRoutesDisplay = p.additionalRoutes.map((x) => {
            if (x.id === p.expandedRouteId) {
                return (
                    <ExpandedRouteCompareRow key={x.id} routePair={x} days={p.days} onAction={p.onCollapseRoute} />
                );
            } else {
                return (
                    <RouteCompareRow key={x.id} routePair={x} days={p.days} onAction={p.onExpandRoute} />
                );
            }
        });

        let baseRoute = <RouteCompareRow routePair={p.baseRoutes} days={p.days} onAction={p.onExpandRoute} />;
        if (p.expandedRouteId === p.baseRoutes.id) {
            baseRoute = <ExpandedRouteCompareRow routePair={p.baseRoutes} days={p.days} onAction={p.onCollapseRoute} />;
        }

        return (
            <div className="route-compare-menu">
                {baseRoute}
                {additionalRoutesDisplay}
                <div className="add-route-button" onClick={p.onClickAddRouteBtn}>
                    +
                </div>
            </div>
        );
    }
    return null;
}

function RouteCompareRow(p: {routePair: DirectionsRoutePair, days: number, onAction: (routeId: string) => void}) {
    const totalCost = (p.routePair.routeFromSource.totalFare + p.routePair.routeFromDestination.totalFare) * p.days;
    const totalDuration = (p.routePair.routeFromSource.duration + p.routePair.routeFromDestination.duration) * p.days;
    return (
        <div className="row comparer-row" onClick={() => p.onAction(p.routePair.id)}>
            <div className="col-xs-8">{p.routePair.address.description}</div>
            <div className="col-xs-2 duration">
                <div className="value">{totalDuration}</div>
                <div className="identifier">min</div>
            </div>
            <div className="col-xs-2 cost">
                <div className="value">{totalCost.toFixed(2)}</div>
                <div className="identifier">SGD</div>
            </div>
        </div>
    );
}

function ExpandedRouteCompareRow(p: {routePair: DirectionsRoutePair, days: number, onAction: () => void}) {
    return (
        <div className="expanded-comparer-row">
            <div className="row" onClick={() => p.onAction()}>
                <div className="col-xs-12">{p.routePair.address.description}</div>
            </div>
            <div className="row">
                <div className="col-xs-8">
                    <DirectionsStepsRenderer steps={p.routePair.routeFromSource.route.legs[0].steps} />
                </div>
                <div className="col-xs-2 duration">
                    <div className="value">{p.routePair.routeFromSource.duration * p.days}</div>
                    <div className="identifier">min</div>
                </div>
                <div className="col-xs-2 cost">
                    <div className="value">{(p.routePair.routeFromSource.totalFare * p.days).toFixed(2)}</div>
                    <div className="identifier">SGD</div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-8">
                    <DirectionsStepsRenderer steps={p.routePair.routeFromDestination.route.legs[0].steps} />
                </div>
                <div className="col-xs-2 duration">
                    <div className="value">{p.routePair.routeFromDestination.duration * p.days}</div>
                    <div className="identifier">min</div>
                </div>
                <div className="col-xs-2 cost">
                    <div className="value">{(p.routePair.routeFromDestination.totalFare * p.days).toFixed(2)}</div>
                    <div className="identifier">SGD</div>
                </div>
            </div>
        </div>
    );
}