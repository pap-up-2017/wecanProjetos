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
import projeto.dao.NotificacaoDao;
import projeto.entity.Notificacao;
import projeto.util.Datas;

@Path("/notificacaorest")
public class NotificacaoRest {
	
	// get para puxar todas valores do banco..
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/user/{id}")
	public List<Notificacao> listarNotificacoesUsuario(@PathParam("id") int id) {
		NotificacaoDao dao = FactoryDao.createNotificacaoDao();
		return dao.listarPorUsuario(id);	
	}
	
	// post para um novo cadastro
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postcad")
	public void cadastrarNotificacao(Notificacao n) {	
		NotificacaoDao dao = FactoryDao.createNotificacaoDao();
		n.setDataNotificacao(Datas.retornaDataAtual());
		n.setStatusNotificacao("Não lida");
		if (n.getIdNotificacao() < 1){
			dao.salvar(n);		
		}
	}
	
	// post para uma nova alteração... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postalt")
	public void alterarNotificacao(Notificacao n) throws IllegalAccessException, InstantiationException {
		NotificacaoDao dao = FactoryDao.createNotificacaoDao();
		if (n.getIdNotificacao() > 0){
			Notificacao not = dao.getObjById(n.getIdNotificacao());
			// Função para não passar todos os campos para o update
			Notificacao nFinal = mergeObjects(n, not);
			dao.alterar(nFinal);
		}
	}
	
	// post para excluir um dado no banco ... 
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/postdel")
	public void deletarNotificacao(Notificacao n) {
		NotificacaoDao dao = FactoryDao.createNotificacaoDao();
		if (n.getIdNotificacao() > 0){
			dao.excluir(n);
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
