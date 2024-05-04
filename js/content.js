document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  const message = {
    type: "checkUpdates",
  };

  chrome.runtime.sendMessage(message, function (response) {
    if (response) {
      console.log(response)
      if (response.error) {
        console.error(response.error);
      } else {
        const totalMembers = response.total_members;
        try {
          var storageMembers = localStorage.getItem("totalMembers");
        } catch (error) {
          console.log("No members in the storage");
        }
        if (storageMembers != null && response.total_subscribers) {
          // Check for new users in the mailchimp list
          if (totalMembers > storageMembers) {
            console.log("totalMembers > storageMembers");
            const message = {
              type: "fetchMembers",
            };
            chrome.runtime.sendMessage(message, function (response) {
              if (response) {
                console.log("New users fetched");
                localStorage.setItem("totalMembers", response.total_members);
                const timeSecondRequest = fetchTimeRequest(
                  response.halfMembers,
                  3.5
                );
                setTimeout(() => {
                  document.location.href = "popup.html";
                }, timeSecondRequest);
              }
            });
          } else {
            localStorage.setItem("totalMembers", totalMembers);
            document.location.href = "popup.html";
          }
        } else {
          // Send request with the extension is open in a first time
          localStorage.setItem("totalMembers", totalMembers);
          const message = {
            type: "fetchMembers",
          };
          chrome.runtime.sendMessage(message, function (response) {
            if (response) {
              const timeSecondRequest = fetchTimeRequest(
                response.halfMembers,
                3.5
              );
              setTimeout(() => {
                document.location.href = "popup.html";
              }, timeSecondRequest);
            }
          });
        }
      }
    } else {
      console.error("Not response received");
    }
  });
}

function fetchTimeRequest(members, timeSecondRequest) {
  timeSecondRequest = Math.round((members / 100) * 3500); // Multiply for 3500 to ms convert
  console.log(timeSecondRequest);
  return timeSecondRequest;
}
