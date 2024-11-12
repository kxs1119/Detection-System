# backend/schema.py
from ariadne import QueryType, make_executable_schema, gql
from .models import Alert

type_defs = gql('''
    type Query {
        alerts: [Alert!]!
    }

    type Alert {
        alert_id: ID!
        device_id: Int!
        location_id: Int!
        alert_type: String!
        timestamp: String!
        status: String!
    }
''')

query = QueryType()

@query.field("alerts")
def resolve_alerts(*_):
    alerts = Alert.query.all()
    return [
        {
            "alert_id": alert.alert_id,
            "device_id": alert.device_id,
            "location_id": alert.location_id,
            "alert_type": alert.alert_type,
            "timestamp": alert.timestamp.isoformat(),
            "status": alert.status
        }
        for alert in alerts
    ]


schema = make_executable_schema(type_defs, query)
