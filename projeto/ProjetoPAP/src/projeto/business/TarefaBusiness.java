package projeto.business;

import java.lang.reflect.Field;

import projeto.dao.FactoryDao;
import projeto.dao.TarefaDao;
import projeto.dao.UsuarioDao;
import projeto.entity.Tarefa;
import projeto.entity.Usuario;
import projeto.util.Datas;

public class TarefaBusiness {
	
	public void create (int idUsuario, Tarefa tarefa){
		Usuario usuario = new Usuario();
		System.out.println("Id do usuario da tarefa: "+idUsuario);
		UsuarioDao userDao = new UsuarioDao();
		try{
			usuario = userDao.getObjById(idUsuario);
			tarefa.setUsuarioModificacao(usuario);
			TarefaDao dao = FactoryDao.createTarefaDao();
			tarefa.setDataCriacao(Datas.retornaDataAtual());
			if (tarefa.getIdTarefa() < 1){
				dao.salvar(tarefa);		
			}
		}catch(Exception ex){
			System.out.println("Não foi possivel cadastrar");
		}	
	}
	
	public void alterar (int idUsuario, Tarefa tarefa) throws IllegalAccessException, InstantiationException{
		System.out.println("Id do usuario modi");
		TarefaDao dao = FactoryDao.createTarefaDao();
		if (tarefa.getIdTarefa() > 0){
			Tarefa t = dao.getObjById(tarefa.getIdTarefa());
			 // Função para não passar todos os campos para o update
			Tarefa tFinal = mergeObjects(tarefa, t);
			// pega o usuário
			Usuario usuario = new Usuario();
			UsuarioDao userDao = new UsuarioDao();
			try{
				usuario = userDao.getObjById(idUsuario);
				tFinal.setUsuarioModificacao(usuario);
				dao.alterar(tFinal);
			}catch(Exception ex){
				System.out.println("Não foi possivel atualizar");
			}	
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
