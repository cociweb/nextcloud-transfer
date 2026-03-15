import { createApp } from 'vue'
import { addNewFileMenuEntry, Permission } from '@nextcloud/files'
import { translate, translatePlural } from '@nextcloud/l10n'
import Transfer from './Transfer.vue'
import TransferSvg from '@mdi/svg/svg/cloud-upload.svg'

const vueMountElement = document.createElement('div')
document.body.append(vueMountElement)

const app = createApp(Transfer)

// Make translation functions globally available
app.config.globalProperties.t = translate
app.config.globalProperties.n = translatePlural

const vueMount = app.mount(vueMountElement)

addNewFileMenuEntry({
	id: 'transfer',
	displayName: translate('transfer', 'Upload by link'),
	iconSvgInline: TransferSvg,
	order: -1,

	// Only display in folders where this user has permission to create files
	if: context => (context.permissions & Permission.CREATE) !== 0,

	async handler(context, content) {
		vueMount.open(context)
	}
})
