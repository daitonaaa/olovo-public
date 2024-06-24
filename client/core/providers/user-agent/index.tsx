import { UserAgent } from 'next-useragent'
import React from 'react'
import { Props } from './model'

const UserAgentContext = React.createContext<UserAgent | undefined>(undefined)

export const UserAgentProvider: React.FC<Props> = ({ userAgent, children }) => {
  return <UserAgentContext.Provider value={userAgent || {}}>{children}</UserAgentContext.Provider>
}

export const useUserAgent = () => React.useContext(UserAgentContext)
