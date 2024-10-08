import { useSecurityStatus } from './useSecurityStatus';
import { LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Loader } from '~components';
import { COLORS } from '~constants';
import { ControlStoreProps, SecurityStatusType } from '~types';

const dictionary: Record<SecurityStatusType, { name: string; color: string }> = {
  waiting: {
    name: 'Waiting',
    color: COLORS.blue,
  },
  running: {
    name: 'Running',
    color: COLORS.green,
  },
  error: {
    name: 'Error',
    color: COLORS.pink,
  },
};

interface SecurityStatusProps extends ControlStoreProps {}

export const SecurityStatus = observer(({ controlStore }: SecurityStatusProps) => {
  const { securityStatus, fetchStatus } = controlStore;
  const { status, sharesCount, sharesThreshold } = securityStatus;
  const dictRecord = useMemo(() => dictionary[status], [status]);
  const { classes } = useSecurityStatus({ color: dictRecord.color });

  const statusText = useMemo(
    () =>
      status === 'waiting'
        ? `${dictRecord.name} (${sharesCount}/${sharesThreshold})`
        : dictRecord.name,
    [status, dictRecord, sharesCount, sharesThreshold],
  );

  return (
    <>
      <LinearProgress
        className={classes.progress}
        variant='determinate'
        value={Math.round((100 / sharesThreshold) * sharesCount)}
      />
      <Typography className={classes.info} variant='h4'>
        <Loader
          size={20}
          style={{
            // color: 'black',
            visibility: fetchStatus === 'fetching' ? 'visible' : 'hidden',
            // display: fetchStatus === 'fetching' ? 'block' : 'none',
          }}
        />
        {statusText}
        <Loader size={20} style={{ visibility: 'hidden' }} />
      </Typography>
    </>
  );
});
