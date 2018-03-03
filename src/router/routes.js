import CcHome from '../templates/home.vue'
import CcSobre from '../templates/sobre.vue'
import CcEstadoLista from '../templates/sel-estado.vue'
import CcCidade from '../templates/sel-cidade.vue'
import CcLista from '../templates/lista.vue'
import CcCultos from '../templates/cultos.vue'
import CcCultoDetalhe from '../templates/culto-detalhe.vue'
import CcEstados from '../templates/estados.vue'
import CcRegioes from '../templates/sel-regiao.vue'
import CcListasEstado from '../templates/listas-estado.vue'
import CcContato from '../templates/contato.vue'
import CcInscrever from '../templates/inscrever.vue'
import CcInscreverEmail from '../templates/inscrever-email.vue'
import CcNotificar from '../templates/notificar.vue'
import CcEmail from '../templates/email.vue'

export default [
	{
		path: '/',
		component: CcHome
	},
	{
		path: '/sobre',
		component: CcSobre
	},
	{
		path: '/sel-estado',
		component: CcEstadoLista
	},
	{
		path: '/sel-cidade/:id',
		component: CcCidade
	},
	{
		path: '/lista/:id',
		component: CcLista
	},
	{
		path: '/cultos/:id',
		component: CcCultos
	},
	{
		path: '/estados',
		component: CcEstados
	},
	{
		path: '/listas/:id',
		component: CcListasEstado
	},
	{
		path: '/detalhes/:id',
		component: CcCultoDetalhe
	},
	{
		path: '/contato/',
		component: CcContato
	},
	{
		path: '/inscrever/',
		component: CcInscrever
	},
	{
		path: '/inscrever-email/',
		component: CcInscreverEmail
	},
	{
		path: '/receber-lista/',
		component: CcNotificar
	},
	{
		path: '/sel-regiao/',
		component: CcRegioes
	},
	{
		path: '/sel-email/:id',
		component: CcEmail
	},
	{ path: '*', redirect: '/' },

]