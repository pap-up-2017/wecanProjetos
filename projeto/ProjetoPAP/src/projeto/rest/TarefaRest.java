package projeto.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Tarefa;
import projeto.util.Datas;


@Path("/tarefarest")
public class TarefaRest {

	// get para puxar todas as tarefas no banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tarefa> listartarefas() {
		InterfaceDao<Tarefa> dao = FactoryDao.createTarefaDao();
		return dao.listar();	
	}
	
	// post para cadastro de uma nova tarefa.
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarTarefa(Tarefa tarefa) {	
		InterfaceDao<Tarefa> dao = FactoryDao.createTarefaDao();
		tarefa.setDataCriacao(Datas.retornaDataAtual());
		tarefa.setStatusTarefa("Fazer");
		if (tarefa.getIdTarefa() < 1){
			dao.salvar(tarefa);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarTarefa(Tarefa tarefa) {
		InterfaceDao<Tarefa> dao = FactoryDao.createTarefaDao();
		if (tarefa.getIdTarefa() > 0){
			dao.alterar(tarefa);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarTarefa(Tarefa tarefa) {
		InterfaceDao<Tarefa> dao = FactoryDao.createTarefaDao();
		if (tarefa.getIdTarefa() > 0){
			dao.excluir(tarefa);
		}
	}
}
