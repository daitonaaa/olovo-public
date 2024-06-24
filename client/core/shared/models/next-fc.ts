import React, { PropsWithChildren } from 'react'
import { Head } from '../components/head'

export interface Empty {}

export interface NextPageMixedProps<CP, LP> {
  layout?: React.FC<PropsWithChildren<LP & { pageProps: CP }>>
  layoutProps?: LP
  headProps:
    | ((componentProps: CP) => React.ComponentProps<typeof Head>)
    | React.ComponentProps<typeof Head>
}

// eslint-disable-next-line
export interface NextPageFC<CP = Empty, LP = Empty>
  extends React.FC<CP>,
    NextPageMixedProps<CP, LP> {}
