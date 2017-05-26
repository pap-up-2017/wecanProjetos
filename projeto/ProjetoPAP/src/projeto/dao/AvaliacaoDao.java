package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Avaliacao;

public class AvaliacaoDao {


	public void salvar(Avaliacao a) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da Avaliacao
		em.persist(a);
		// envia os dados da Avaliacao
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}


	public List<Avaliacao> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as Avaliacoes
		Query q = em.createQuery("from Avaliacao");
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	public List<Avaliacao> listarPorDisciplina(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as Avaliacoes
		Query q = em.createQuery("from Avaliacao where disciplina_idDisciplina = "+ id);
		// retorna os dados encontrados
		return q.getResultList();
	}



	public Avaliacao getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontra a Avaliacao de acordo com o id
		Query q = em.createQuery("from Avaliacao where idAvaliacao = " + id);
		return (Avaliacao) q.getSingleResult();
	}


	public void alterar(Avaliacao a) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da Avaliacao
		em.merge(a);
		// envia os dados da tarefa	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(Avaliacao a) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Avaliacao WHERE idAvaliacao=" + a.getIdAvaliacao()).executeUpdate();
		// envia os dados do Avaliacao
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
