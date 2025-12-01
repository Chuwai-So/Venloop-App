 Before Discussion

 For this project, choosing a good backend system is crucial to the project's success. Based our scope, we believe that these are the most important qualities that we demand from such system:
	-Ease of setup and maintenance
	-Real-Time responsiveness
	-High Availability and Reliability
	-Scalability

I have compared the differences between creating a custom backend system (e.g. Node.js + Express.js + MongoDB) versus using a backend-as-a-service like Firebase. Based on my research, here are the pros and cons:

Option 1: Node.js + Express.js

Pros:
	•	Full control over business logic
	•	Can work with any kind of database
	•	No vendor lock-in
	•	Cost can be controlled

Cons:
	•	Requires manual server setup
	•	Needs real-time implementation (e.g. WebSocket)
	•	More configurations required
	•	Longer development time and effort

⸻

Option 2: Firebase

Pros:
	•	No backend server needed
	•	Built-in real-time updates
	•	Generous free tier

Cons:
	•	Limited control over server/backend logic
	•	Vendor lock-in
	•	May exceed free tier limits

⸻

Conclusion

As of writing this (31.03), the team is inclined to choose Firebase due to its ease of use, built-in real-time features, and generous free tier — which may help reduce overall development time. However, we acknowledge the trade-off: we might need to remove some scope-heavy features such as video uploading.

Additionally, we’ve taken into account that our stakeholders might already have an existing hosting service. In that case, we may pivot to Node.js + Express, which would offer more flexibility and long-term learning benefits for the team.

We aim to finalize this decision after our upcoming meeting with stakeholders.