# Installation:

You need to install Mosquitto in your local machine.

For Mac,

```

brew install mosquitto

```

Then update the broker config file (mosquitto.conf) , to have the following settings:

```

log_type all

listener 1883

allow_anonymous true

```

Install dependencies:

```

$ cd <project_directory>
$ npm install

```

# Usage:

Open three terminal windows:

- One is for running the local mosquitto.

```

mosquitto -c /opt/homebrew/etc/mosquitto/mosquitto.conf

```

- One is for running publisher.

```

npm run pub

```

- One is for running subscriber.

```

npm run sub

```

# mqtt-node-alarm-aggregator

This is a node.js mqtt client that subscribes and keeps track of six alarm topics. When **any** of these child topics publishes a value of '0', the client will publish a '0' to the parent topic. Only when **all** child topics last published a value of '1', then the client can publish '1' to the parent topic. The value of '0' represents a flag indicating of that status of that system needing attention, while a value of '1' indicates no attention needed . Assume the initial state of the parent topic is '1'.
