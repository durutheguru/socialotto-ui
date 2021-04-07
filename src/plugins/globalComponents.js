import Badge from "@/components/argon/Badge";
import BaseAlert from "@/components/argon/BaseAlert";
import BaseButton from "@/components/argon/BaseButton";
import BaseCheckbox from "@/components/argon/BaseCheckbox";
import BaseDropdown from "@/components/argon/BaseDropdown";
import BaseInput from "@/components/argon/BaseInput";
import BaseNav from "@/components/argon/BaseNav";
import BasePagination from "@/components/argon/BasePagination";
import BaseProgress from "@/components/argon/BaseProgress";
import BaseRadio from "@/components/argon/BaseRadio";
import BaseSlider from "@/components/argon/BaseSlider";
import BaseSwitch from "@/components/argon/BaseSwitch";
import CloseButton from "@/components/argon/CloseButton";
import Card from "@/components/argon/Card";
import Icon from "@/components/argon/Icon";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(CloseButton.name, CloseButton);
    Vue.component(Icon.name, Icon);
  },
};
