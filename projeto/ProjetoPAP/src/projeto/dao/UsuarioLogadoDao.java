package projeto.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.UsuarioLogado;

public class UsuarioLogadoDao implements InterfaceDao<UsuarioLogado> {
	
	@Override
	public void salvar(UsuarioLogado t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da cidade
		em.persist(t);
		// envia os dados da cidade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<UsuarioLogado> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades
		Query q = em.createQuery("FROM UsuarioLogado");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public UsuarioLogado getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades de acordo com o id
		Query q = em.createQuery("from UsuarioLogado where id = " + id);
		return (UsuarioLogado) q.getSingleResult();
	}

	@Override
	public void alterar(UsuarioLogado t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da cidade
		em.merge(t);
		// envia os dados da cidade	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(UsuarioLogado t) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM UsuarioLogado WHERE id=" + t.getId()).executeUpdate();
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();			
	}
}
