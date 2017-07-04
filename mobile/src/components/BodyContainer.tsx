import * as React from 'react';
import * as constants from '../constants/index';
import {CurrentPage} from '../constants/index';
import MainForm from '../containers/MainForm';

interface Props {
    currentPage: constants.CurrentPage;
}
export function BodyContainer(p: Props) {
    switch (p.currentPage) {
        case CurrentPage.MainMenu:
            return <MainForm />;
        case CurrentPage.RouteCompareMenu:
            return null;
        default:
            return null;
    }
}