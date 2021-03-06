import React from 'react';
import classNames from 'classnames';
import { NAME as ABOUT } from '../About';
import Analyser from '../../../../components/Analyser';
import ControlBar from '../../../../components/ControlBar';
import Menu from '../../../../components/Menu';
import Slider from '../../../../components/Slider';
import Text from '../../../../components/Text';
import Recorder from '../../../../components/Recorder';
import { ANALYSER_HEIGHT, GITHUB_ISSUES_LINK } from '../../../../lib/constants';
import { ROUTES } from '../../../../config/routes';
import stylesheet from './Sidebar.less';

const Spacer = () => <div className={stylesheet.spacer} />;

const Separator = ({ children }) => (
  <div className={stylesheet.separator}>{children}</div>
);

const NavMenu = ({ shouldShowMenu, onCloseNavMenu, onShowModal }) => (
  <Menu
    className={stylesheet.navMenu}
    isOpen={shouldShowMenu}
    onClose={onCloseNavMenu}
    items={[
      { label: 'About', icon: 'info', onClick: () => onShowModal(ABOUT) },
      { label: 'Manual', icon: 'book', to: ROUTES.MANUAL },
      {
        label: 'Issues',
        icon: 'github',
        to: GITHUB_ISSUES_LINK,
      },
    ]}
  />
);

const SpaceControls = ({ onRandomize, onUndo, onRedo, onOpenNavMenu }) => (
  <div className={classNames([stylesheet.block, stylesheet.block__margin])}>
    <ControlBar
      actions={[
        { type: 'menu', color: 'white', onClick: onOpenNavMenu },
        { type: 'spacer' },
        { type: 'refresh', color: 'white', onClick: onRandomize },
        { type: 'back', color: 'white', onClick: onUndo },
        { type: 'forward', color: 'white', onClick: onRedo },
      ]}
    />
  </div>
);

const OutputRecorder = () => (
  <div className={stylesheet.block}>
    <Recorder />
  </div>
);

const ParameterSliders = ({
  onChangeVolume,
  onUpdateRangeValue,
  ranges,
  volume,
}) => (
  <div className={classNames([stylesheet.block, stylesheet.block__padding])}>
    {ranges.map(({ id, ...rangeProps }) => (
      <Slider
        key={id}
        {...rangeProps}
        onChange={value => onUpdateRangeValue(value, id)}
      />
    ))}
    <Separator>
      <Slider label="Volume" onChange={onChangeVolume} value={volume} />
    </Separator>
  </div>
);

const Title = () => (
  <div className={stylesheet.block}>
    <div className={stylesheet.title}>
      <Text color="white" type="title">
        TiberSynth
      </Text>
    </div>
  </div>
);

const Visualizer = () => (
  <div className={stylesheet.block} style={{ height: ANALYSER_HEIGHT }}>
    <Analyser height={ANALYSER_HEIGHT} />
  </div>
);

const Sidebar = props => (
  <div className={stylesheet.container}>
    <NavMenu {...props} />
    <SpaceControls {...props} />
    <Spacer />
    <OutputRecorder />
    <ParameterSliders {...props} />
    <Title />
    <Visualizer />
  </div>
);

export default Sidebar;
