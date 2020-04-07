using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class AppManager : Singleton<AppManager>
{

    [SerializeField]
    public bool startExperience = false;
    public GameObject[] image_prefab;

    [Header("Grid")]
    public int gridX;
    public int gridY;
    public float gridSpacingOffset = 1f;
    public Vector3 gridOrigin = Vector3.zero;

    void Start()
    {
        SpawnGrid();
    }

    void SpawnGrid()
    {
        for (int x = 0; x < gridX; x++)
        {
            for (int y = 0; y < gridY; y++)
            {
                Vector3 spawnPosition = new Vector3(x * gridSpacingOffset, y * gridSpacingOffset, 0) + gridOrigin;
                PickAndSpawn(spawnPosition, Quaternion.Euler(-270, 90, -90));
            }

        }
    }

    void PickAndSpawn(Vector3 positionToSpawn, Quaternion rotationToSpawn) {
        int randomIndex = Random.Range(0, image_prefab.Length);
        Instantiate(image_prefab[randomIndex], positionToSpawn, rotationToSpawn);
    
    }

    public void Start_Instagram_World()
    {
        startExperience = true;
    }
}
