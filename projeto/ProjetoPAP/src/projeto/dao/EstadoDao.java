package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Estado;

// implementando a interfaceDao
public class EstadoDao implements InterfaceDao<Estado> {

	@Override
	public void salvar(Estado uf) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados do estado
		em.persist(uf);
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

	@Override
	public List<Estado> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar os estados
		Query q = em.createQuery("from Estado");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Estado getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar os estados
		Query q = em.createQuery("from Estado where id = " + id);
		return (Estado) q.getSingleResult();
	}
	
	@Override
	public void alterar(Estado uf){
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados do estado
		em.merge(uf);
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
	
	@Override
	public void excluir(Estado uf){
	}
}
