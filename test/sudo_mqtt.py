import time
import paho.mqtt.client as paho
from paho import mqtt
from datetime import datetime
import json

# setting callbacks for different events to see if it works, print the message etc.
def on_connect(client, userdata, flags, rc, properties=None):
    print("CONNACK received with code %s." % rc)

# with this callback you can see if your publish was successful
def on_publish(client, userdata, mid, properties=None):
    print("mid: " + str(mid))

# print which topic was subscribed to
def on_subscribe(client, userdata, mid, granted_qos, properties=None):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

# print message, useful for checking if it was successful
def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

# using MQTT version 5 here, for 3.1.1: MQTTv311, 3.1: MQTTv31
# userdata is user defined data of any type, updated by user_data_set()
# client_id is the given name of the client
client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
client.on_connect = on_connect

# enable TLS for secure connection
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
# set username and password
#client.username_pw_set("Abcde55", "YOUR_PASSWORD")
# connect to HiveMQ Cloud on port 8883 (default for MQTT)
client.connect("mqtt.eclipseprojects.io", 8883)

# setting callbacks, use separate functions like above for better visibility
client.on_subscribe = on_subscribe
client.on_message = on_message
client.on_publish = on_publish

uid = "id_" + "A1234" # sudo id

# subscribe to all topics of encyclopedia by using the wildcard "#"
client.subscribe("panIot/" + uid , qos=1)

# a single publish, this can also be done in loops, etc.
client.publish("mnt/" + uid, payload='ready', qos=1)


def push_data(date_time,pulse,pressupper,presslower,oxi,pulse2):
    x = {"device_token":"aaa1-bbb2","date":str(date_time[0]),"time":str(date_time[1]),"BloodPress": [{"SYS": str(pressupper),"DIA": str(presslower),"PUL": str(pulse),}],"Oximeter": [{"SAT": str(oxi),"PUL": str(pulse2),}],}
    y = json.dumps(x)
    
    client.publish("panIot/", payload=y, qos=1)

# loop_forever for simplicity, here you need to stop the loop manually
# you can also use loop_start and loop_stop
#client.loop_forever()

# sudo data
pulse = [102,108,120,130]
pulse2 = [104,102,103,100]
pressupper = [107,108,109,110]
presslower = [75,75,76,76]
oxi = [95,96,97,98]
list_date =  [["2023-04-04","20:25"],["2023-04-04","20:27"],["2023-04-04","20:29"],["2023-04-04","20:31"]]
k = 1
for j in range(50):
    i = 0
    for i in range(4):
        k+=1
        print(k)
        client.loop_start()
        client.loop_stop()
        dt = datetime.now()
        date_time = str(dt).split()
        push_data(list_date[i],k,k*3,k*2,k+10,pulse2[i])
        time.sleep(4)
    