using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TransformObj : MonoBehaviour
{

    public float rotationSpeed;
    float z = 0;

    void Update()
    {
        z += Time.deltaTime * rotationSpeed;
        transform.localRotation = Quaternion.Euler(180, 0, z);
    }
}