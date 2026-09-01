import ScriptController from './ScriptController'
import AcceptAllController from './AcceptAllController'
import AcceptEssentialsController from './AcceptEssentialsController'
import ConfigureController from './ConfigureController'
import ResetController from './ResetController'
const Controllers = {
    ScriptController: Object.assign(ScriptController, ScriptController),
AcceptAllController: Object.assign(AcceptAllController, AcceptAllController),
AcceptEssentialsController: Object.assign(AcceptEssentialsController, AcceptEssentialsController),
ConfigureController: Object.assign(ConfigureController, ConfigureController),
ResetController: Object.assign(ResetController, ResetController),
}

export default Controllers