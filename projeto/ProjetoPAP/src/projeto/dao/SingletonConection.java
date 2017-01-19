package projeto.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class SingletonConection {
	public static EntityManagerFactory emf = Persistence.
			createEntityManagerFactory("groupDatabase");
	
	public static EntityManager getInstance(){
		return emf.createEntityManager();
	}
}
