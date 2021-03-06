import React from 'react';
import { connect } from 'react-redux';

import Indicator, { StatusContainer } from '../../components/Indicator/Indicator';

const Status = ({
    pending, ipfsStatus, ethNodeStatus, cyberNodeStatus, ethNetworkName,
}) => (
    <StatusContainer>
        <Indicator status={ pending ? null : ipfsStatus }>ipfs</Indicator>
        <Indicator status={ pending ? null : ethNodeStatus }>eth {ethNetworkName && (ethNetworkName)}  </Indicator>
        <Indicator status={ pending ? null : cyberNodeStatus }>cyber</Indicator>
    </StatusContainer>
);

export default connect(
    state => ({
        ipfsStatus: state.settings.ipfsStatus,
        ethNodeStatus: state.settings.ethNodeStatus,
        cyberNodeStatus: state.settings.cyberNodeStatus,
        pending: state.settings.pending,
        ethNetworkName: state.settings.ethNetworkName,
    }),
)(Status);
