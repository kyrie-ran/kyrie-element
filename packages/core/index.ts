import {makeInstaller} from '@kyrie-ui/utils'
import components from './components'
import '@kyrie-ui/theme'

const installer = makeInstaller(components)

export * from '@kyrie-ui/components'

export default installer