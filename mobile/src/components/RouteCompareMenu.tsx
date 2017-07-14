import * as React from 'react';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import './RouteCompareMenu.css';
import DirectionsStepsRenderer from './DirectionsStepsRenderer';

interface Props {
    days: number;
    onClickAddRouteBtn: () => void;
    additionalRoutes: DirectionsRoutePair[];
    expandedRouteId: string;
    onExpandRoute: (routeId: string) => void;
    onCollapseRoute: () => void;
    onDeleteRoute: (pairId: string) => void;
    onChangeRoute: () => void;
}
export function RouteCompareMenu(p: Props) {
    if (p.additionalRoutes.length > 0) {
        const additionalRoutesDisplay = p.additionalRoutes.map((x) => {
            if (x.id === p.expandedRouteId) {
                return (
                    <ExpandedRouteCompareRow
                        key={x.id}
                        routePair={x}
                        days={p.days}
                        onAction={p.onCollapseRoute}
                        deletable={true}
                        onClickDelete={(pairId: string) => p.onDeleteRoute(pairId)}
                        onClickChangeRoute={p.onChangeRoute}
                    />
                );
            } else {
                return (
                    <RouteCompareRow key={x.id} routePair={x} days={p.days} onAction={p.onExpandRoute}/>
                );
            }
        });
        return (
            <div className="route-compare-menu">
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

function ExpandedRouteCompareRow(p: {routePair: DirectionsRoutePair, deletable: boolean, days: number,
                                     onAction: () => void, onClickDelete: (pairId: string) => void,
                                     onClickChangeRoute: () => void}) {
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
            <div className="row button-row">
                <div className="col-xs-4">
                    <a className="change-route-button" onClick={() => p.onClickChangeRoute()}>Change Route</a>
                </div>
                {p.deletable &&
                    <div className="col-xs-4">
                        <a className="delete-button" onClick={() => p.onClickDelete(p.routePair.id)}>Delete</a>
                    </div>
                }
                <div className="col-xs-4" />
            </div>
        </div>
    );
}