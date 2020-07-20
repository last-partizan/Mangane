import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from '../../../components/icon';
import { changeSetting, getSettings } from 'soapbox/actions/settings';
import SettingToggle from '../../notifications/components/setting_toggle';

const messages = defineMessages({
  switchToLight: { id: 'tabs_bar.theme_toggle_light', defaultMessage: 'Switch to light theme' },
  switchToDark: { id: 'tabs_bar.theme_toggle_dark', defaultMessage: 'Switch to dark theme' },
});

const mapStateToProps = state => {
  return {
    settings: getSettings(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleTheme(setting) {
    dispatch(changeSetting(['themeMode'], setting));
  },
});

export default @connect(mapStateToProps, mapDispatchToProps)
@injectIntl
class ThemeToggle extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    settings: ImmutablePropTypes.map.isRequired,
    toggleTheme: PropTypes.func,
    showLabel: PropTypes.bool,
  };

  handleToggleTheme = () => {
    this.props.toggleTheme(this.props.settings.get('themeMode') === 'light' ? 'dark' : 'light');
  }

  render() {
    const { intl, settings, showLabel } = this.props;
    let toggle = (
      <SettingToggle settings={settings} settingPath={['themeMode']} condition={'light'} onChange={this.handleToggleTheme} icons={{ checked: <Icon id='sun' />, unchecked: <Icon id='moon' /> }}ariaLabel={settings.get('themeMode') === 'light' ? intl.formatMessage(messages.switchToDark) : intl.formatMessage(messages.switchToLight)} />
    );

    if (showLabel) {
      toggle = (
        <SettingToggle settings={settings} settingPath={['themeMode']} condition={'light'} onChange={this.handleToggleTheme} icons={{ checked: <Icon id='sun' />, unchecked: <Icon id='moon' /> }} label={settings.get('themeMode') === 'light' ? intl.formatMessage(messages.switchToDark) : intl.formatMessage(messages.switchToLight)} />
      );
    }

    return (
      <div class='theme-toggle'>
        {toggle}
      </div>
    );
  }
  
}
