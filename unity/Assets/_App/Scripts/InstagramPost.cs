using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InstagramPost : MonoBehaviour
{

    float speed;

    public void Start()
    {
        speed = Random.Range(0.23f, 0.25f);
    }

    void Update()
    {
        transform.position += Vector3.forward * Time.deltaTime * -speed;
    }

    void OnTriggerEnter(Collider collider)
    {
        if (collider.tag == "limit")
            this.transform.localPosition = new Vector3(this.transform.localPosition.x, this.transform.localPosition.y, Random.Range(28f, 30f));
    }

}