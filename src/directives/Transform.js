import Vue from 'vue';

Vue.directive('meu-transform', {
        
        bind(el, binding, vnode){

            let clicked = false;
            let value = binding.value;
            let efeito;
            el.addEventListener('dblclick', function(){
                if(binding.arg == 'scale' || !binding.arg){
                    clicked = !clicked;
                    
                    if(clicked){
                        efeito = `scale(${value})`;
                    }else{
                        efeito = `scale(${1})`;
                    }
                }else if(binding.arg == 'rotate') efeito = `rotate(${value}deg)`;
                el.style.transform = efeito;

                if(binding.modifiers.animate) el.style.transition = "transform 0.5s";
            })
        }
});