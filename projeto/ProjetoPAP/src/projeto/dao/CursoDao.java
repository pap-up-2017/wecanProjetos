package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.Curso;

public class CursoDao implements InterfaceDao<Curso>{

	@Override
	public void salvar(Curso c) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados
		em.persist(c);
		// envia os dados 
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
		
	}

	@Override
	public List<Curso> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para puxar os dados
		Query q = em.createQuery("from Curso");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Curso getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// Query para pesquisa via Id
		Query q = em.createQuery("from Curso where id = " + id);
		return (Curso) q.getSingleResult();
	}

	@Override
	public void alterar(Curso c) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados
		em.merge(c);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

	@Override
	public void excluir(Curso c) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão
		em.createQuery("DELETE FROM Curso WHERE id=" + c.getIdCurso()).executeUpdate();
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
	
}
