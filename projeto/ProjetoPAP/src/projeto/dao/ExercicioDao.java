package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.Exercicio;

public class ExercicioDao {


	public void salvar(Exercicio e) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados do exercicio
		em.persist(e);
		// envia os dados do exercicio
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}


	public List<Exercicio> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar os exercicios
		Query q = em.createQuery("from Exercicio");
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	public List<Exercicio> listarPorAvaliacao(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as exercicio
		Query q = em.createQuery("from Exercicio where avaliacao_idAvaliacao = "+ id);
		// retorna os dados encontrados
		return q.getResultList();
	}



	public Exercicio getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontra a exercicio de acordo com o id
		Query q = em.createQuery("from Exercicio where idExercicio = " + id);
		return (Exercicio) q.getSingleResult();
	}


	public void alterar(Exercicio e) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da exercicio
		em.merge(e);
		// envia os dados da exercicio	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}


	public void excluir(Exercicio e) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Exercicio WHERE idExercicio=" + e.getIdExercicio()).executeUpdate();
		// envia os dados do exercicio
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
