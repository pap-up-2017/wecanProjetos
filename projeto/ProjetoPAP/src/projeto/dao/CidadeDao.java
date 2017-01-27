package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Cidade;
import projeto.entity.Estado;

public class CidadeDao implements InterfaceDao<Cidade>{

	@Override
	public void salvar(Cidade c) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da cidade
		em.persist(c);
		// envia os dados da cidade
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

	@Override
	public List<Cidade> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades
		Query q = em.createQuery("from Cidade");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Cidade getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as cidades de acordo com o id
		Query q = em.createQuery("from Cidade where id = " + id);
		return (Cidade) q.getSingleResult();
	}

	@Override
	public void alterar(Cidade c) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da cidade
		em.merge(c);
		// envia os dados da cidade	
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Cidade t) {
		// TODO Criar metodo excluir
		
	}

}
