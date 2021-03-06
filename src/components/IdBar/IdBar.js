import React, { Component } from 'react';
import './IdBar.css';
import CybLink from '../CybLink';

const IdBar = ({ defaultEthAccount, defaultCyberAccount }) => (
    <div className='id-bar'>
        <SettingsLink />
        <CybLink dura='txq.cyb' className='id-bar__txq'>txq</CybLink>
        <WalletLink />
        <CurrentUser defaultEthAccount={ defaultEthAccount } defaultCyberAccount={ defaultCyberAccount } />
    </div>
);

export const SettingsLink = () => (
    <CybLink dura='settings.cyb' className='id-bar__settings'>Settings</CybLink>
);

export const WalletLink = () => (
    <CybLink dura='wallet.cyb' className='id-bar__wallet'>Wallet</CybLink>
);

class CurrentUser extends Component {
    state = {
        open: false,
    };

    toggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        const { open } = this.state;
        const { defaultEthAccount, defaultCyberAccount } = this.props;

        return (
            <div className='user-popup__container'>
                {defaultEthAccount ? (
                    <img className='id-bar__user' onClick={ this.toggle } src={`https://robohash.org/${defaultEthAccount}`} />
                ) : (
                    <div className='id-bar__user id-bar__user--default' onClick={ this.toggle } />
                )}
                <div className={ `user-popup ${open ? 'user-popup--open' : ''}` }>
                    <div>
                        <span className='tokenName'>
                            ETH:
                        </span>
                        {defaultEthAccount}
                    </div>
                    <hr className='separator' />
                    <div>
                        <span className='tokenName'>
                            CYBER:
                        </span>
                        {defaultCyberAccount}
                    </div>
                </div>
            </div>
        );
    }
}

export { CurrentUser };

export default IdBar;
