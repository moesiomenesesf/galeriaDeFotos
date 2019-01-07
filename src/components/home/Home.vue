<template>

  

  <div class= "corpo">
    <h1 class = "centralizado"> {{ titulo }} </h1>
    <p v-show="mensagem" class = "centralizado"> {{ mensagem }} </p>

    <input type= "search" class="filtro" @input= "filtro = $event.target.value" placeholder= "Filtre pelo titulo:">
    {{filtro}}
    <ul class = "lista-fotos">
      <li class = "lista-fotos-item" v-for= "foto of fotosComFiltro">
        <meu-painel :titulo = "foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate = "1.5" :url= "foto.url" :titulo= "foto.titulo"/>
          <meu-botao tipo="button" rotulo="Remover" :confirmacao="true" @botaoAtivado="remove(foto)" estilo="perigo"  />
        </meu-painel>      
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
export default {

  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    'meu-botao': Botao
  },

  data(){
    
    return{

      titulo: 'Fotos',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  computed: {
    
    fotosComFiltro(){
      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }else{
        return this.fotos;
      }
    }
  },

  methods: {
      remove(foto){
            this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`).then( ()=> 
              {
                let indice = this.fotos.indexOf(foto);
                this.fotos.splice(indice, 1);
                this.mensagem = "Imagem excluida com sucesso"
              }, 
            (err)=>{
              console.log(err);
              this.mensagem = "Não foi possível apagar a imagem!";
            })
      }
  },
  created() {
    this.$http.get("http://localhost:3000/v1/fotos")
    .then(res => res.json())
    .then(fotos => this.fotos = fotos); 
  }
}
</script>

<style lang="scss">
  .corpo{
    font-family: Helvetica;
    width: 96%;
    margin: 0 auto;
  }

  .centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style: none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }
  

  .filtro{
    width:100%;
  }

  
</style>
