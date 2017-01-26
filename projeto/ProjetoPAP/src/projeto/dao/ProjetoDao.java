package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Projeto;

public class ProjetoDao implements InterfaceDao<Projeto> {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(Projeto p) {
		
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados do estado
		em.persist(p);
		// envia os dados do estado
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
		
	}

	@Override
	public List<Projeto> listar() {
		// cria a Query para encontrar os estados
		Query q = em.createQuery("from Projeto");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Projeto getObjById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void alterar(Projeto t) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void excluir(Projeto t) {
		// TODO Auto-generated method stub
		
	}

}
