---
title: ReactJS Azure CDN or Azure App Service
date: 2023-01-20T00:00:00.000Z
summary: There are several advantages to hosting a React JS application on Azure CDN instead of Azure App Service.
image: /images/blog/azure-cdn-vs-azure-app-service.png
tags: [azure, cdn, app service, codescouts]
---

Are you thinking about hosting a React JS application? If so, you may be wondering which option is better: Azure CDN or Azure App Service. While both services are viable options for hosting applications, there are some key advantages to hosting a React JS app on Azure CDN instead of Azure App Service.

There are several advantages to hosting a React JS application on Azure CDN instead of Azure App Service:

## Performance improvement

One of the biggest benefits of hosting a React JS app on Azure CDN is improved performance. When you host an app on Azure CDN, static files such as HTML, CSS, JavaScript, and so on can be distributed through Azure’s global server network. This means users can request the assets from the server closest to their location, which reduces page load time and improves app performance. In addition, Azure CDN can provide higher speed and better load capacity for your files, so users can access the app more quickly and efficiently.

## Cost savings

Another benefit of hosting a React JS app on Azure CDN is cost savings. By distributing static files through a network of servers, you can reduce the load on the main server, which means you need less server capacity to handle traffic. This can reduce hosting and maintenance costs. In addition, Azure CDN offers flexible pricing based on traffic, which means you only pay for the data transferred through the CDN. This can be more economical than using Azure App Service.

Here is a table taken from Azure’s website.
<br />
These are the prices for Azure App Service:
![Untitled](/images/blog/azure-app-service-prices.png)

We can see the prices are measured in hours, that is, processing time.

While on Azure CDN:
![Untitled](/images/blog/azure-cdn-prices.png)
The prices are defined by GB of transfer.

## Scalability

Hosting a React JS app on Azure CDN allows for greater scalability. Because static files can be distributed across multiple servers, it is possible to handle traffic spikes without affecting app performance. This means the app can grow as traffic increases without worrying about server capacity. Additionally, Azure CDN can automatically adjust server capacity based on demand, so you don’t need to scale the app manually.

## Security

Azure CDN can help protect a React JS application from distributed denial-of-service (DDoS) attacks. By distributing static files across a network of servers, it reduces the load on the main server and avoids network congestion, reducing the chance of a successful DDoS attack. In addition, Azure CDN provides additional security options, such as bot protection and user authentication, which can help safeguard your application from threats.

In summary, when you need to host a React JS app or any web application with static files or client-side rendering, Azure CDN can improve performance, reduce costs, allow greater scalability, and enhance security compared to Azure App Service.

If you are looking to host a React JS application, Azure CDN is an option you should seriously consider.

## References

- <https://azure.microsoft.com/es-es/pricing/details/app-service/linux/>
- <https://azure.microsoft.com/es-es/pricing/details/cdn/>

If you liked it, share it, as it would help us reach everyone 👇

Best regards 👋
