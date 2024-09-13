import { useMonitoringStyles } from './useMonitoringStyles';
import { Button, Typography } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { Loader } from '~components';
import { useInitEffect } from '~hooks';
import { ControlStoreProps } from '~types';

interface MonitoringProps extends ControlStoreProps {}

export const Monitoring = observer(({ controlStore }: MonitoringProps) => {
  const { classes } = useMonitoringStyles();

  const [collapsed, setCollapsed] = useState<number | boolean>(2);

  const {
    fetchStatus,
    serviceStats,
    serviceVersion,
    softResetActionStatus,
    hardResetActionStatus,
  } = controlStore;

  useInitEffect(() => {
    controlStore.fetchingStats = true;

    controlStore.fetchVersion();

    return () => {
      controlStore.fetchingStats = false;
    };
  });

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.leftPanel}>
          <div className={classes.leftPanelTitle}>
            <Typography variant='h5'>{`${serviceVersion.name} v${serviceVersion?.version}`}</Typography>{' '}
          </div>
          <div className={classes.leftPanelTitle}>
            <Typography variant='h5'>Stats</Typography>{' '}
            <Loader
              size={20}
              style={{
                visibility: fetchStatus === 'fetching' ? 'visible' : 'hidden',
                color: 'black',
              }}
            />
          </div>
          {serviceStats && (
            <JsonView value={serviceStats ?? {}} displayDataTypes={false} collapsed={collapsed} />
          )}
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.rightPanelTop}>
            <Button
              variant='contained'
              onClick={() => (collapsed ? setCollapsed(false) : setCollapsed(2))}
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </Button>
          </div>
          <div className={classes.rightPanelBottom}>
            <Button variant='contained' onClick={() => controlStore.softReset()}>
              <Loader
                size={20}
                style={{ visibility: softResetActionStatus === 'fetching' ? 'visible' : 'hidden' }}
              />
              Soft reset
              <Loader size={20} style={{ visibility: 'hidden' }} />
            </Button>
            <Button
              className={classes.hardResetButton}
              variant='contained'
              onClick={() => controlStore.hardReset()}
            >
              <Loader
                size={20}
                style={{ visibility: hardResetActionStatus === 'fetching' ? 'visible' : 'hidden' }}
              />
              Hard reset
              <Loader size={20} style={{ visibility: 'hidden' }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
