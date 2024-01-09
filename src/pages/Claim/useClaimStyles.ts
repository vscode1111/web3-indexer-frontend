import { makeStyles } from 'tss-react/mui';

export const useClaimStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mainContaniner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  tabs: {
    backgroundColor: theme.colors.gray0,
  },
}));
