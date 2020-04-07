using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// abstract class to make singleton classes
public abstract class Singleton<T> : MonoBehaviour where T : Component
{
    #region Fields
    private static T instance;
    #endregion // Fields

    #region Properties
    public static T Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<T>();
                if (instance == null)
                {
                    GameObject obj = new GameObject();
                    obj.name = typeof(T).Name;
                    instance = obj.AddComponent<T>();
                }
            }
            return instance;
        }
    }
    #endregion // Properties

    #region MonoBehaviour Methods
    protected virtual void Awake()
    {
        if (instance == null)
        {
            instance = this as T;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
    #endregion // MonoBehaviour Methods
}