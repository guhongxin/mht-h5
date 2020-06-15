import Vue from "vue";
import 'vant/lib/index.css';
import { customFormat } from "~/assets/utils/comm.ts"
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  List,
  PullRefresh,
  Tab,
  Tabs,
  Dialog,
  Toast,
  Form,
  Field,
  Button,
  Overlay,
  Empty,
  ActionSheet,
  DatetimePicker,
  Popup,
  Collapse,
  CollapseItem 
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Overlay);
Vue.use(Empty);
Vue.use(ActionSheet);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Collapse);
Vue.use(CollapseItem);
  
Vue.prototype.$customFormat = customFormat
Vue.prototype.$defaultUserImage = "/img/user.png"
