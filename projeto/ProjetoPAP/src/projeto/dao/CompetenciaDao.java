package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Competencia;

public class CompetenciaDao implements InterfaceDao<Competencia> {

	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(Competencia c) {
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da competencia
		em.persist(c);
		// envia os dados da competencia
		em.getTransaction().commit();
		// fecha a instancia
		em.close();

	}

	@Override
	public List<Competencia> listar() {
		// cria a Query para encontrar as competências
		Query q = em.createQuery("from Competencia");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Competencia getObjById(int id) {
		// cria a Query para encontrar a competencia de acordo com o id
		Query q = em.createQuery("from Competencia where id = " + id);
		return (Competencia) q.getSingleResult();
	}

	@Override
	public void alterar(Competencia c) {
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da competencia
		em.merge(c);
		// envia os dados da competencia
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Competencia c) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Competencia WHERE id=" + c.getIdCompetencia()).executeUpdate();
		// envia os dados da competencia
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

}
