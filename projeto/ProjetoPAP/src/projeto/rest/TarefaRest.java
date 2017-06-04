package projeto.rest;

import java.lang.reflect.Field;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.business.TarefaBusiness;
import projeto.dao.FactoryDao;
import projeto.dao.TarefaDao;
import projeto.entity.Tarefa;
import projeto.util.Datas;


@Path("/tarefarest")
public class TarefaRest {

	// get para puxar todas as tarefas no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tarefa> listartarefas() {
		TarefaDao dao = FactoryDao.createTarefaDao();
		return dao.listar();	
	}
	
	// get para puxar todas as tarefas no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/proj/{idProjeto}")
	public List<Tarefa> listarTarefasDoProjeto(@PathParam("idProjeto") int id) {
		TarefaDao dao = FactoryDao.createTarefaDao();
		return dao.listarPorProjeto(id);	
	}
	
	// post para cadastro de uma nova tarefa.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad/{id}")
	public void cadastrarTarefa(@PathParam("id") int id, Tarefa tarefa) {	
		
		System.out.println("id do usuario responsavel:"+ tarefa.getResponsavel().getIdUsuario());
		TarefaBusiness bus = new TarefaBusiness();
		bus.create(id, tarefa);
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt/{id}")
	public void alterarTarefa(@PathParam("id") int id,Tarefa tarefa) throws IllegalAccessException, InstantiationException{
		TarefaBusiness bus = new TarefaBusiness();
		if(id > 0){
			bus.alterar(id, tarefa);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarTarefa(Tarefa tarefa) {
		TarefaDao dao = FactoryDao.createTarefaDao();
		if (tarefa.getIdTarefa() > 0){
			dao.excluir(tarefa);
		}
	}
}
