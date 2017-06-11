package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.ItemAvaliacaoProjetoBusiness;
import projeto.entity.ItemAvaliacaoProjeto;

@Path("/itemprojetorest")
public class ItemAvaliacaoProjetoRest {
	
		// puxa os ativos
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		public List<ItemAvaliacaoProjeto> listarItensDisponiveis() {
			ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
			return itemBus.listaAtivos();
		}
		
		// puxa todos
		@GET
		@Produces(MediaType.APPLICATION_JSON)
		@Path("/getallitens")
		public List<ItemAvaliacaoProjeto> listarAllItens() {
			ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
			return itemBus.listaAll();
		}
		
		// add
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/postcad")
		public void cadastrarItem(ItemAvaliacaoProjeto item) {	
			ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
			if (item.getId() < 1){
				itemBus.create(item);
			}
		}
		
		// altera 
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/postalt")
		public void alterarItem(ItemAvaliacaoProjeto item) {
			ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
			if (item.getId() > 0){
				itemBus.alterar(item);
			}
		}
		
		//del logico
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/desativa")
		public void desativarItem(ItemAvaliacaoProjeto item) {
			ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
			if (item.getId() > 0){
				itemBus.deleteLogico(item);
			}
		}
		
		//ativa item
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		@Path("/ativa")
		public void ativarItem(ItemAvaliacaoProjeto item) {
			ItemAvaliacaoProjetoBusiness itemBus = new ItemAvaliacaoProjetoBusiness();
			if (item.getId() > 0){
				itemBus.ativaItem(item);
			}
		}
}
