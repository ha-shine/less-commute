import * as React from 'react';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import './RouteCompareMenu.css';

interface Props {
    baseRoutes: DirectionsRoutePair | null;
    days: number;
}
export function RouteCompareMenu(p: Props) {
    if (p.baseRoutes !== null) {
        return (
            <div>
                <RouteCompareRow routePair={p.baseRoutes} days={p.days} />
            </div>
        );
    }
    return null;
}

function RouteCompareRow(p: {routePair: DirectionsRoutePair, days: number}) {
    const totalCost = (p.routePair.routeFromSource.totalFare + p.routePair.routeFromDestination.totalFare) * p.days;
    const totalDuration = (p.routePair.routeFromSource.duration + p.routePair.routeFromDestination.duration) * p.days;
    return (
        <div className="row comparer-row">
            <div className="col-xs-8">{p.routePair.address.description}</div>
            <div className="col-xs-2">{totalCost}</div>
            <div className="col-xs-2">{totalDuration}</div>
        </div>
    );
}