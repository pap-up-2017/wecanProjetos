package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Atividade;
import projeto.entity.RespostaAtividade;
import projeto.entity.RespostaUsuario;

public class RespostaUsuarioDao {


	public void salvar(RespostaUsuario ru) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da respostaUsuario
		em.persist(ru);
		// envia os dados da RespostaUsuario
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}


	public List<RespostaUsuario> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as tarefa
		Query q = em.createQuery("from RespostaUsuario");
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	public List<RespostaUsuario> listarPorResposta(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as respostaAtividade
		Query q = em.createQuery("from RespostaUsuario where respostaAtividade_idRespostaAtividade = "+ id);
		// retorna os dados encontrados
		return q.getResultList();
	}



	public RespostaUsuario getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontra a atividade de acordo com o id
		Query q = em.createQuery("from RespostaUsuario where idRespostaUsuario = " + id);
		return (RespostaUsuario) q.getSingleResult();
	}


	public void alterar(RespostaUsuario ru) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da respostaUsuario
		em.merge(ru);
		// envia os dados da respostaUsuario	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(RespostaUsuario ru) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM RespostaUsuario WHERE respostaAtividade_idRespostaAtividade=" + ru.getIdRespostaUsuario()).executeUpdate();
		// envia os dados do respostaUsuario
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
