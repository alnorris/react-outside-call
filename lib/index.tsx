import React from 'react'

type Default = { [key: string]: any  };

type CallerObj<T extends Default> = {
    [Property in keyof T]?: ReturnType<T[Property]>
}

type OutsideConfig<Type extends Default> = {
  call: CallerObj<Type>
  initCaller: CallerObj<Type>
}

export function createCaller<T>(initCaller: T): OutsideConfig<T> {
  return {
    initCaller,
    call: {}
  }
}

const OutsideCallConsumer: React.FC<Default> = ({ config }) => {
  for(let key in config.initCaller) {
    config.call[key] = config.initCaller[key]()
  }
  return null
}

interface OutsideCallConsumerWrapperProps {
  config: Default
}

const OutsideCallConsumerWrapper: React.FC<OutsideCallConsumerWrapperProps> = ({ children, config }) => (
  <>
    {children}
    <OutsideCallConsumer config={config} />
  </>
)

export default OutsideCallConsumerWrapper