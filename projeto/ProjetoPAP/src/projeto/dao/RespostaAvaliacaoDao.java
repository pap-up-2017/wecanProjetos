package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.RespostaAvaliacao;

public class RespostaAvaliacaoDao {


	public void salvar(RespostaAvaliacao ra) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da respostaAvaliacao
		em.persist(ra);
		// envia os dados da respostaAvaliacao
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}


	public List<RespostaAvaliacao> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as tarefa
		Query q = em.createQuery("from RespostaAvaliacao");
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	public List<RespostaAvaliacao> listarPorExercicio(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as respostaAvaliacao
		Query q = em.createQuery("from RespostaAvaliacao where exercicio_idexercicio = "+ id);
		// retorna os dados encontrados
		return q.getResultList();
	}



	public RespostaAvaliacao getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontra a avaliacao de acordo com o id
		Query q = em.createQuery("from RespostaAvaliacao where idRespostaAvaliacao = " + id);
		return (RespostaAvaliacao) q.getSingleResult();
	}


	public void alterar(RespostaAvaliacao ra) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da respostaAvaliacao
		em.merge(ra);
		// envia os dados da respostaAvaliacao	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(RespostaAvaliacao ra) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM RespostaAvaliacao WHERE idRespostaAvaliacao=" + ra.getIdRespostaAvaliacao()).executeUpdate();
		// envia os dados do respostaAvaliacao
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
