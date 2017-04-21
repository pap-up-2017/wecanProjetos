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

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
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
	@Path("/postcad")
	public void cadastrarTarefa(Tarefa tarefa) {	
		TarefaDao dao = FactoryDao.createTarefaDao();
		tarefa.setDataCriacao(Datas.retornaDataAtual());
		if (tarefa.getIdTarefa() < 1){
			dao.salvar(tarefa);		
		}
	}
	
	// post para alterar um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarTarefa(Tarefa tarefa) throws IllegalAccessException, InstantiationException {
		TarefaDao dao = FactoryDao.createTarefaDao();
		if (tarefa.getIdTarefa() > 0){
			Tarefa t = dao.getObjById(tarefa.getIdTarefa());
			// Função para não passar todos os campos para o update
			Tarefa tFinal = mergeObjects(tarefa, t);
			dao.alterar(tFinal);
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
	
	@SuppressWarnings("unchecked")
	public static <T> T mergeObjects(T first, T second) throws IllegalAccessException, InstantiationException {
	    Class<?> clazz = first.getClass();
	    Field[] fields = clazz.getDeclaredFields();
	    Object returnValue = clazz.newInstance();
	    for (Field field : fields) {
	        field.setAccessible(true);
	        Object value1 = field.get(first);
	        Object value2 = field.get(second);
	        Object value = (value1 != null) ? value1 : value2;
	        field.set(returnValue, value);
	    }
	    return (T) returnValue;
	}
}
