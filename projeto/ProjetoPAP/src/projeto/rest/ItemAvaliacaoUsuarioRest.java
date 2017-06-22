package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.ItemAvaliacaoUsuarioBusiness;
import projeto.entity.ItemAvaliacaoUsuario;

@Path("/itemusuariorest")
public class ItemAvaliacaoUsuarioRest {
	
		// puxa os ativos
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		public List<ItemAvaliacaoUsuario> listarItensDisponiveis() {
			ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
			return itemBus.listaAtivos();
		}
		
		// puxa todos
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/getallitens")
		public List<ItemAvaliacaoUsuario> listarAllItens() {
			ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
			return itemBus.listaAll();
		}
		
		// add
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/postcad")
		public void cadastrarItem(ItemAvaliacaoUsuario item) {	
			ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
			if (item.getId() < 1){
				itemBus.create(item);
			}
		}
		
		// altera 
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/postalt")
		public void alterarItem(ItemAvaliacaoUsuario item) {
			ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
			if (item.getId() > 0){
				itemBus.alterar(item);
			}
		}
		
		//del logico
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/desativa")
		public void desativarItem(ItemAvaliacaoUsuario item) {
			ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
			if (item.getId() > 0){
				itemBus.deleteLogico(item);
			}
		}
		
		//ativa item
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/ativa")
		public void ativarItem(ItemAvaliacaoUsuario item) {
			ItemAvaliacaoUsuarioBusiness itemBus = new ItemAvaliacaoUsuarioBusiness();
			if (item.getId() > 0){
				itemBus.ativaItem(item);
			}
		}
}
